import React from 'react'
import Layout from '../../components/Layout'
import PostsCatalogue from '../../components/PostsCatalogue'
// import BlogRoll from '../../components/BlogRoll'


export default function Superblog({ data }) {
    // console.log(data);
    return (

        <Layout>
            <PostsCatalogue/>
        </Layout>
        )
};

