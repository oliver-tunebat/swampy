import * as React from "react";
import type { NextPage } from "next";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import markdown from "../modules/content/markdown/components.md";
import remarkGfm from "remark-gfm";
import { markdownMappings } from "../modules/content/markdown/markdownMappings";

const Components: NextPage = () => {
    return (
        <PageContainer>
            <Head>
                <title>Swampy | Components</title>
                <meta
                    name="description"
                    content="Examples of components and mark down included in Swampy."
                />
            </Head>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownMappings}
            >
                {markdown}
            </ReactMarkdown>
        </PageContainer>
    );
};

export default Components;
