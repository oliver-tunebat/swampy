import * as React from "react";
import { Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import * as complexTypes from "react-markdown/lib/complex-types.js";
import { Code } from "../../../common/components/Code";
import NavLink from "../../../common/components/NavLink";
import Image from "next/legacy/image";
import { LinkableHeadingTypography } from "../../../common/components/LinkableHeadingTypography";

export const markdownMappings:
| Partial<
    Omit<
        complexTypes.NormalComponents,
        keyof SpecialComponents
    > &
        SpecialComponents
>
| undefined = {
    h1: ({ children }) =>
        <LinkableHeadingTypography
            variant="h3"
            component="h1"
            sx={{ mb: 8 }}
            id={children as string}
        >{children}</LinkableHeadingTypography>,
    h2: ({ children }) =>
        <LinkableHeadingTypography
            variant="h4"
            component="h2"
            sx={{ mt: 8 }}
            id={children as string}
        >{children}</LinkableHeadingTypography>,
    h3: ({ children }) =>
        <LinkableHeadingTypography
            variant="h5"
            component="h3"
            sx={{ mt: 6 }}
            id={children as string}
        >{children}</LinkableHeadingTypography>,
    h4: ({ children }) =>
        <LinkableHeadingTypography
            variant="h6"
            component="h4"
            sx={{ mt: 4 }}
            id={children as string}
        >{children}</LinkableHeadingTypography>,
    h5: ({ children }) =>
        <Typography
            variant="h6"
            component="h5"
            sx={{ mt: 4, fontSize: "1.1rem" }}
            id={children as string}
        >{children}</Typography>,
    h6: ({ children }) =>
        <Typography
            variant="h6"
            component="h6"
            sx={{ mt: 4, fontSize: "0.9rem" }}
            id={children as string}
        >{children}</Typography>,
    hr: ({}) => <Divider sx={{ width: "100%", mt: 1 }} />,
    p: ({ children }) =>
        <Typography
            variant="body1"
            sx={{ mt: 2 }}
        >{children}</Typography>,
    code: ({ children, inline }) =>
        <Code inline={inline}>
            {children}
        </Code>,
    a: ({ children, href, title }) => {
        if (!href) {
            return null;
        }

        const isExternal = !href.startsWith("/") && !href.startsWith("#") && !href.startsWith("mailto");

        return <NavLink
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            title={title}
        >
            {children}
        </NavLink>;
    },
    table: ({ children }) => <TableContainer sx={{ mt: 2 }}>
        <Table sx={{ width: "100%" }}>
            {children}
        </Table>
    </TableContainer>,
    thead: ({ children }) => <TableHead>{children}</TableHead>,
    th: ({ children, style }) => <TableCell align={specifyTextAlign(style?.textAlign)}>{children}</TableCell>,
    td: ({ children, style }) => <TableCell align={specifyTextAlign(style?.textAlign)}>{children}</TableCell>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    img: ({ src, alt, title }) => {

        // title is used to specify the aspect ratio of the image
        // make sure to include the aspect ratio as the title in all images
        const height = 1 / +(title ?? 1);

        return <Container
            component="span"
            sx={{ mt: 2 }}
            disableGutters
        >
            <Image
                src={src ?? ""}
                alt={alt ?? ""}
                layout="responsive"
                width="1"
                height={height}
            />
        </Container>;
    },

};

function specifyTextAlign(textAlign?:
        "center"
        | "end"
        | "justify"
        | "left"
        | "match-parent"
        | "right"
        | "start"
        | "inherit"
        | "-moz-initial"
        | "initial"
        | "revert"
        | "revert-layer"
        | "unset") {

    let align: "inherit" | "left" | "center" | "right" | "justify" | undefined;

    switch (textAlign) {
    case "center":
        align = "center";
        break;
    case "end":
        align = "right";
        break;
    case "justify":
        align = "justify";
        break;
    case "left":
        align = "left";
        break;
    case "start":
        align = "left";
        break;
    case "right":
        align = "right";
        break;
    case "inherit":
        align = "inherit";
        break;
    default:
        break;
    }

    return align;
}