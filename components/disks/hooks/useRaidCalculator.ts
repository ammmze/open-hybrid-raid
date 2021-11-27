import { useState, useEffect } from 'react';

export type Disk = {
    size: number;
    partitions: Partition[];
}

export type Partition = {
    size: number;
}

export type Array = {
    type?: 1 | 5;
    partitionSize: number;
    partitionCount: number;
    arraySize: number;
}

export type RaidCalculatorResult = {
    disks: number[];
    addDisk: (size: number) => void;
    removeDisk: (index: number) => void;
    arrays: Array[];
}

export type RaidCalculatorProps = {
    disks?: number[];
}

export const useRaidCalculator = (props: RaidCalculatorProps): RaidCalculatorResult => {
    const [disks, setDisks] = useState<number[]>([]);

    useEffect(() => {
        setDisks(props.disks || []);
    }, [(props.disks || []).join(',')])

    let remaining = [...disks];
    const arrays: Array[] = [];
    do {
        const minSize = Math.min(...remaining);
        if (minSize <= 0 || !Number.isFinite(minSize)) {
            break;
        }
        if (remaining.length >= 3) {
            arrays.push({
                type: 5,
                partitionSize: minSize,
                partitionCount: remaining.length,
                arraySize: minSize * (remaining.length - 1),
            })
        } else if (remaining.length === 2) {
            arrays.push({
                type: 1,
                partitionSize: minSize,
                partitionCount: remaining.length,
                arraySize: minSize,
            })
        } else {
            arrays.push({
                partitionSize: minSize,
                partitionCount: remaining.length,
                arraySize: 0,
            })
            break
        }

        remaining = remaining.map(size => size - minSize).filter(size => size > 0)
    } while (remaining.length > 0)

    return {
        disks,
        arrays,
        addDisk: size => { setDisks(disks => [...disks, size]) },
        removeDisk: index => {
            setDisks(disks => {
                const copy = [...disks];
                copy.splice(index, 1);
                return copy;
        }) },
    };
}