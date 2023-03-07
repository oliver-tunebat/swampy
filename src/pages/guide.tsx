import * as React from "react";
import type { NextPage } from "next";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import markdown from "../../README.md";
import remarkGfm from "remark-gfm";
import { markdownMappings } from "../modules/content/markdown/markdownMappings";

const Guide: NextPage = () => {
    return (
        <PageContainer>
            <Head>
                <title>Swampy Guide - How to use Swampy</title>
                <meta
                    name="description"
                    content="Get started with Swampy by following the guide."
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

export default Guide;
