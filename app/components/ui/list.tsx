import React from "react"
import styled from "styled-components"

const StyledList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 8px 0;
  color: #009c3b; /* Verde do Brasil */
`

const StyledListItem = styled.li`
  margin-bottom: 4px;
  color: inherit;
`

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
}

export const List: React.FC<ListProps> = ({ children, ...props }) => {
  return <StyledList {...props}>{children}</StyledList>
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export const ListItem: React.FC<ListItemProps> = ({ children, ...props }) => {
  return <StyledListItem {...props}>{children}</StyledListItem>
}
