<<<<<<< HEAD
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
=======
/*
 * Achei: Stolen Object Tracking System.
 * Copyright (C) 2025  Team Achei
 * 
 * This file is part of Achei.
 * 
 * Achei is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Achei is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Achei.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * Contact information: teamachei.2024@gmail.com
*/

import styled from "styled-components"

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`
>>>>>>> 781dada54d96921395cd7551e49774e7fa09e040
