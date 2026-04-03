# ruff: noqa: E402
import asyncio

from nonebot import logger, require
from nonebot.plugin import PluginMetadata, inherit_supported_adapters

require("nonebot_plugin_alconna")
require("nonebot_plugin_uninfo")
require("nonebot_plugin_htmlrender")
require("nonebot_plugin_apscheduler")
require("nonebot_plugin_localstore")

import time
from pathlib import Path

from nonebot_plugin_apscheduler import scheduler

from .config import Config, pconfig
from .matchers import clear_result_cache
from .utils.browser import BROWSER
from .utils.common import safe_unlink

__plugin_meta__ = PluginMetadata(
    name="链接分享解析 Lite 版",
    description="通用媒体链接分享解析",
    usage="发送支持平台的(BV号/链接/小程序/卡片)即可",
    type="application",
    homepage="https://github.com/molanp/nonebot-plugin-parser-lite",
    config=Config,
    supported_adapters=inherit_supported_adapters(
        "nonebot_plugin_alconna", "nonebot_plugin_uninfo"
    ),
    extra={
        "author": "molanp",
        "homepage": "https://github.com/molanp/nonebot-plugin-parser-lite",
        "version": "1.1.0-547efb",
    },
)


@scheduler.scheduled_job("interval", hours=1, id="parser-clean-local-cache")
async def clean_plugin_cache() -> None:
    """周期性清理过期缓存文件，并重置解析状态。"""

    try:
        # 保留最近 N 小时内的缓存，默认 1 小时
        reserve_hours: int = 1
        now = time.time()

        if all_files := [f for f in pconfig.cache_dir.iterdir() if f.is_file()]:
            to_delete: list[Path] = []
            expire_seconds = reserve_hours * 60 * 60
            for f in all_files:
                try:
                    mtime = f.stat().st_mtime
                except OSError:
                    # 拿不到 stat 就直接尝试删除
                    to_delete.append(f)
                    continue

                if now - mtime >= expire_seconds:
                    to_delete.append(f)

            if not to_delete:
                logger.info(
                    f"Cache files found ({len(all_files)}), "
                    f"but none older than {reserve_hours} hour(s); skip cleaning"
                )
            else:
                tasks = [safe_unlink(file) for file in to_delete]
                await asyncio.gather(*tasks)
                logger.success(
                    f"Cleaned {len(to_delete)} expired cache files "
                    f"(kept {len(all_files) - len(to_delete)})"
                )

        else:
            logger.info("No cache files to clean")
    except Exception:
        logger.exception("Error while cleaning cache files")

    # 资源清理完毕后，清理 result 缓存并重连浏览器
    clear_result_cache()
    BROWSER.reconnect()
