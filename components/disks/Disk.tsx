import { ComponentPropsWithoutRef, ReactElement } from "react"
import styled from "styled-components"

export type DiskProps = {
    size: number;
} & ComponentPropsWithoutRef<'div'>

const StyledDisk = styled.div`
    margin: 0.5em;
    background-image: url('/images/hard-disk-svgrepo-com.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: inline-flex;
    width: 75px;
    height: 75px;
    justify-content: center;
    align-items: flex-end;
    box-sizing: content-box;
`;

const DiskLabel = styled.div`
    background-color: #FFFFFF99;
    padding: 0.3em;
    width: 100%;
    text-align: center;
    font-size: 14px;
`;

export const Disk = ({ size, ...divProps }: DiskProps): ReactElement => {
    const unit = size >= 1000 ? 'TB' : 'GB';
    const unitSize = unit === 'TB' ? size / 1000 : size;
    return (
        <StyledDisk {...divProps}>
            <DiskLabel>{unitSize} {unit}</DiskLabel>
        </StyledDisk>
    )
}
