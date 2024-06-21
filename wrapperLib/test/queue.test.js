import { test, expect } from 'vitest'
import { addToQueue, ensureAndGetGlobal, initQueue, processQueue } from "../src/queueInit.js";


test('ensureAndGetGlobal init', ({}) => {
    const w = {};

    ensureAndGetGlobal(w)
    expect(w.wrapper).toBeDefined()
    expect(w.wrapper.cmd).toBeDefined()

    expect(w.wrapper.processQueue).toBeUndefined()
    initQueue(w)
    expect(w.wrapper.processQueue).toBeDefined()
})
// todo ensure cmd is copied if created before
// todo ensure that wrapper is not overriden if exists



test('executes functions in queue', ({}) => {
    let callbackCalled = false;
    const w = {
        wrapper: {
            cmd: []
        }
    };
    w.wrapper.cmd.push(() => {
        callbackCalled = true
    })
    processQueue(w)
    expect(callbackCalled).toBe(true)
})


test('adds to queue',()=>{
    const w = {}
    addToQueue(()=>{}, w);

    expect(w.wrapper.cmd.length).eq(1)
})
