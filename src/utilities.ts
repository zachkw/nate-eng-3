import fs from 'fs';

export const SNAPSHOT_DIRECTORY: string = __dirname + '/snapshots/';


export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);


export const clearSnapshotDirectory = (): void =>
    fs.readdir(SNAPSHOT_DIRECTORY, (err, files) => {
        files?.forEach(file => {
            fs.unlinkSync(SNAPSHOT_DIRECTORY + file);
        })
    });
