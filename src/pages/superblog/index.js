import React from 'react'
import Layout from '../../components/Layout'
// import PostsCatalogue from '../../components/PostsCatalogue'
import FilterByTag from '../../components/FilterByTag'


export default class Superblog extends React.Component { 
    state = { message: "" }
    callbackFunction = (childData) => {
        console.log("jestem w rodzicu")
      this.setState({message: childData})
    }

    render () {return (
        <Layout>
            <FilterByTag parentCallback = {this.callbackFunction}/>
            {/* <PostsCatalogue/> */}
        </Layout>
        )
    }
}

