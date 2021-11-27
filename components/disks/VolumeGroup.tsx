import { PropsWithChildren, ReactElement } from "react"
import styled from "styled-components"
import { Array } from "./hooks/useRaidCalculator";

export type VolumeGroupProps = PropsWithChildren<{
    arrays: Array[];
}>

const StyledVolumeGroup = styled.div`
    padding: 0.3em;
    margin: 0.3em;
    border-raidus: 5px;
    border: 2px dashed blue;
`;

const Notes = styled.div`
    width: 100%;
    text-align: center;
    flex-basis: 100%;
    margin: 0.3em;
`

export const VolumeGroup = ({ children, arrays }: VolumeGroupProps): ReactElement => {
    const usableSize = arrays.reduce((total, arr) => total + arr.arraySize, 0);
    const protectionSize = arrays.filter(({ type }) => !!type).reduce((total, arr) => total + arr.partitionSize, 0);
    const unusedSize = arrays.filter(({ type }) => !type).reduce((total, arr) => total + arr.partitionSize, 0);
    return (
        <StyledVolumeGroup>
            {children}
            <Notes>
                Volume Group / Hybrid Array<br/>
                (Usable size: {usableSize / 1000} TB. Protection size: {protectionSize / 1000} TB. Unused: {unusedSize / 1000} TB.)
            </Notes>
        </StyledVolumeGroup>
    )
}

