class TimeLimitedCache {
    constructor() {
        this.cache = new Map();
    }

    /**
     * @param {number} key
     * @param {number} value
     * @param {number} duration time until expiration in ms
     * @return {boolean} if un-expired key already existed
     */
    set(key, value, duration) {
        const currentTime = Date.now();

        if (this.cache.has(key) && this.cache.get(key).expirationTime > currentTime) {
            // Key already exists and has not expired
            this.cache.set(key, {
                value,
                expirationTime: currentTime + duration
            });
            return true;
        } else {
            // Key doesn't exist or has expired
            this.cache.set(key, {
                value,
                expirationTime: currentTime + duration
            });
            return false;
        }
    }

    /**
     * @param {number} key
     * @return {number} value associated with key or -1 if expired or not found
     */
    get(key) {
        const currentTime = Date.now();

        if (this.cache.has(key) && this.cache.get(key).expirationTime > currentTime) {
            // Key exists and has not expired
            return this.cache.get(key).value;
        } else {
            // Key doesn't exist or has expired
            return -1;
        }
    }

    /**
     * @return {number} count of non-expired keys
     */
    count() {
        const currentTime = Date.now();
        let count = 0;

        for (const [key, entry] of this.cache.entries()) {
            if (entry.expirationTime > currentTime) {
                count++;
            }
        }

        return count;
    }
}

// Example usage:
