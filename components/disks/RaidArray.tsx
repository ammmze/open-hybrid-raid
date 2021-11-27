import { PropsWithChildren, ReactElement } from "react"
import styled from "styled-components"

export type RaidArrayProps = PropsWithChildren<{
    type?: 1 | 5;
}>

const StyledRaidArray = styled.div`
    border: 2px dashed red;
    padding: 0.3em;
    margin: 0.3em;
    display: flex;
    border-radius: 5px;
    flex-wrap: wrap;
`;

const Notes = styled.div`
    width: 100%;
    text-align: center;
    flex-basis: 100%;
    margin: 0.3em;
`

export const RaidArray = ({ children, type }: RaidArrayProps): ReactElement => {
    return (
        <StyledRaidArray>
            {children}
            {type ? <Notes>RAID {type}</Notes> : <Notes>Unused</Notes>}
        </StyledRaidArray>
    )
}

