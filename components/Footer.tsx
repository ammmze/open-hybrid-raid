import { PropsWithChildren, ReactElement } from "react"
import styled from "styled-components"

export type FooterProps = PropsWithChildren<{}>

const StyledFooter = styled.footer`
    top: 100vh;
    position: sticky;

    padding: 3em 5em;
    background-color: #CFCFCF;
`;

export const Footer = ({ children }: FooterProps): ReactElement => {
    return (
        <StyledFooter>
            {children}
        </StyledFooter>
    )
}

