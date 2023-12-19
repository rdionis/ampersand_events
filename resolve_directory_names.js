import { readdirSync } from 'fs'

/**
 * Retrieves the names of all directories in a given source directory.
 *
 * @param {string} source - The source directory to search for directories.
 * @returns {string[]} - An array of strings containing the names of all directories.
 */
export const resolveDirectoryNames = source =>
    readdirSync(
        source,
        {
            withFileTypes: true
        }
    )
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
