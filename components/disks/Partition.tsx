import { PropsWithChildren, ReactElement } from "react"
import styled from "styled-components"

export type PartitionProps = {
    size: number;
    type?: 1 | 5;
}

const StyledPartition = styled.div<PartitionProps>`
    background: ${({ type }) => {
    switch (type) {
        case 1:
            return 'lightblue';
        case 5:
            return 'lightgreen';
        default:
            return '#CFCFCF';
    }}};
    border-color: #999;
    height: ${props => `${props.size / 1000}em`};
    width: 100px;
    display: flex;
    margin: 0.3em;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

export const Partition = ({ size, ...props }: PartitionProps): ReactElement => {
    return (
        <StyledPartition size={size} {...props}>
            {size / 1000} TB
        </StyledPartition>
    )
}

