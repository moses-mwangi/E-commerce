const CACHE_NAME = "e-commerce-cache-v1";

self.addEventListener("install", (event) => {
  (event as any).waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/shop",
        "/pages/cart",
        "/pages/order",
        "/pages/account",
        // Add other important routes
      ]);
    })
  );
});
