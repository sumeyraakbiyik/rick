import React, { Component } from 'react';

class List extends Component {
    constructor(props){
        super(props);
        this.state={
            info:this.props.info,
            data:[]
        }
    }
    componentDidMount(){
        this.setState({data:this.props.info})
    }
    render() {
        const {data} = this.state
        return (
            <div>
                {data.map((item, index) => {
                return (
                  <p>{index}</p>
                )
              })}
            </div>
        );
    }
}

export default List;
