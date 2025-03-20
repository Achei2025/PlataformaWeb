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

import type React from "react";
import styled from "styled-components";

// Cores do Brasil
const colors = {
  green: "#009c3b",
  yellow: "#ffdf00",
  blue: "#002776",
  white: "#ffffff",
  lightGreen: "#e6f7ef",
  lightYellow: "#fff9e0",
  lightBlue: "#e6eeff",
  lightRed: "#ffebee",
  red: "#e53935",
};

const AlertBoxContainer = styled.div<{ variant: "success" | "warning" | "info" | "danger" }>`
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `background-color: ${colors.lightYellow}; border-color: #ffeeba;`;
      case "info":
        return `background-color: ${colors.lightBlue}; border-color: #bee5eb;`;
      case "danger":
        return `background-color: ${colors.lightRed}; border-color: #f5c6cb;`;
      default:
        return `background-color: ${colors.lightGreen}; border-color: #c3e6cb;`;
    }
  }}
`;

const AlertTitleContainer = styled.h4<{ variant: "success" | "warning" | "info" | "danger" }>`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `color: #856404;`;
      case "info":
        return `color: ${colors.blue};`;
      case "danger":
        return `color: ${colors.red};`;
      default:
        return `color: ${colors.green};`;
    }
  }}
`;

const AlertTextContainer = styled.p<{ variant: "success" | "warning" | "info" | "danger" }>`
  margin: 0;
  font-size: 14px;
  transition: color 0.3s ease;

  ${(props) => {
    switch (props.variant) {
      case "warning":
        return `color: #856404;`;
      case "info":
        return `color: ${colors.blue};`;
      case "danger":
        return `color: ${colors.red};`;
      default:
        return `color: ${colors.green};`;
    }
  }}
`;

interface AlertBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "success" | "warning" | "info" | "danger";
  children: React.ReactNode;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ variant, children, ...props }) => {
  return (
    <AlertBoxContainer variant={variant} {...props}>
      {children}
    </AlertBoxContainer>
  );
};

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: "success" | "warning" | "info" | "danger";
  children: React.ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ variant, children, ...props }) => {
  return (
    <AlertTitleContainer variant={variant} {...props}>
      {children}
    </AlertTitleContainer>
  );
};

interface AlertTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: "success" | "warning" | "info" | "danger";
  children: React.ReactNode;
}

export const AlertText: React.FC<AlertTextProps> = ({ variant, children, ...props }) => {
  return (
    <AlertTextContainer variant={variant} {...props}>
      {children}
    </AlertTextContainer>
  );
};

// Adicionando a definição para AlertDescription
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: "success" | "warning" | "info" | "danger";
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ variant, children, ...props }) => {
  return (
    <AlertTextContainer variant={variant} {...props}>
      {children}
    </AlertTextContainer>
  );
};

// Adicionando a definição para Alert
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "success" | "warning" | "info" | "danger";
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant, children, ...props }) => {
  return (
    <AlertBoxContainer variant={variant} {...props}>
      {children}
    </AlertBoxContainer>
  );
};