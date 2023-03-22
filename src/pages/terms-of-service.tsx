import * as React from "react";
import type { NextPage } from "next";
import PageContainer from "../common/components/PageContainer";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownMappings } from "../modules/content/markdown/markdownMappings";
import markdown from "../modules/content/markdown/terms-of-service.md";

const TermsOfService: NextPage = () => {
    return (
        <PageContainer>
            <Head>
                <title>Terms of Service | Swampy</title>
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

export default TermsOfService;
