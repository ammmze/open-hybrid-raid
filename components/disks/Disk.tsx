import { ComponentPropsWithoutRef, ReactElement } from "react"
import styled from "styled-components"
import getConfig from 'next/config';

export type DiskProps = {
    size: number;
} & ComponentPropsWithoutRef<'div'>

const { publicRuntimeConfig } = getConfig();

const StyledDisk = styled.div`
    margin: 0.3em;
    background-image: url('${publicRuntimeConfig.basePath}/images/hard-disk-svgrepo-com.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: inline-flex;
    width: 75px;
    height: 75px;
    justify-content: center;
    align-items: flex-end;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
`;

const DiskLabel = styled.div`
    background-color: #FFFFFF99;
    padding: 0.3em 0;
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

