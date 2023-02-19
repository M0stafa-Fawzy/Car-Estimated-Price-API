// global before each to runn before all single test suite
// used via setupFilesAfterEnv prop in jest-e2e.json
import { rm } from 'fs/promises'
import { join } from 'path'

global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch (error) { }
})