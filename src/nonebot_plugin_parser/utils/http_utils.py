import httpx
from httpx import AsyncHTTPTransport, Proxy


def get_async_client(
    proxies: dict[str, str] | str | None = None,
    proxy: str | None = None,
    verify: bool = False,
    **kwargs,
) -> httpx.AsyncClient:
    """
    [向后兼容] 创建 httpx.AsyncClient 实例的工厂函数。
    此函数完全保留了旧版本的接口，确保现有代码无需修改即可使用。
    """
    transport = kwargs.pop("transport", None) or AsyncHTTPTransport(verify=verify)
    if proxies:
        if isinstance(proxies, str):
            proxies = {"http://": proxies, "https://": proxies}
        http_proxy = proxies.get("http://")
        https_proxy = proxies.get("https://")
        return httpx.AsyncClient(
            mounts={
                "http://": AsyncHTTPTransport(
                    proxy=Proxy(http_proxy) if http_proxy else None
                ),
                "https://": AsyncHTTPTransport(
                    proxy=Proxy(https_proxy) if https_proxy else None
                ),
            },
            transport=transport,
            **kwargs,
        )
    elif proxy:
        return httpx.AsyncClient(
            mounts={
                "http://": AsyncHTTPTransport(proxy=Proxy(proxy)),
                "https://": AsyncHTTPTransport(proxy=Proxy(proxy)),
            },
            transport=transport,
            **kwargs,
        )
    return httpx.AsyncClient(transport=transport, **kwargs)
