import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Div = styled.div`
    width: 400px;
    height: 30px;
`

class Chart extends React.Component {
    componentDidMount = () => {
        axios.get('api.giphy.com /v1/gifs/search?api_key=viqKBREfDe1FEvrFZkaGbJ3D60BI1PHh')
        .then((res) => console.log(res.data))
    }
    render(){
       

return (
    <Div>
 <form method = "get" title = "Search Form" action="https://cse.google.com/cse/publicurl">
        <div>
           <input type="text" id="q" name="q" title="Search this site" alt="Search Text" maxlength="256" />
           <input type="hidden" id="cx" name="cx" value="013626029654558379071:ze3tw4csia4" />
          <input type="image" id="searchSubmit" name="submit" src="https://www.flaticon.com/free-icon/active-search-symbol_34148" alt="Go" title="Submit Search Query" />
        </div>
       </form>
            <iframe src='https://cse.google.com/cse?cx=002074720583794006872:6j3asc8nihm' title='search'/>
</Div>

    )}
}

    export default Chart