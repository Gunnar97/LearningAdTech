import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { debounce } from "../src/debounce.js";

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('should delay function call', () => {
        const func = vi.fn();
        const wait = 100;
        const debouncedFunc = debounce(func, wait);

        debouncedFunc();
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(wait);
        expect(func).toHaveBeenCalled();
    });

    it('should call function immediately if immediate is true', () => {
        const func = vi.fn();
        const wait = 100;
        const debouncedFunc = debounce(func, wait, true);

        debouncedFunc();
        expect(func).toHaveBeenCalled();

        vi.advanceTimersByTime(wait);
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should not call function again if called within wait time', () => {
        const func = vi.fn();
        const wait = 100;
        const debouncedFunc = debounce(func, wait);

        debouncedFunc();
        vi.advanceTimersByTime(wait / 2);
        debouncedFunc();
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(wait / 2);
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(wait / 2);
        expect(func).toHaveBeenCalled();
    });

    it('should reset timeout on each call', () => {
        const func = vi.fn();
        const wait = 100;
        const debouncedFunc = debounce(func, wait);

        debouncedFunc();
        vi.advanceTimersByTime(wait / 2);
        debouncedFunc();
        vi.advanceTimersByTime(wait / 2);
        debouncedFunc();
        vi.advanceTimersByTime(wait / 2);

        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(wait / 2);
        expect(func).toHaveBeenCalled();
    });
});
