import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
  
class Zip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      zip: this.props.data,
    };
  }


  render() {
    return(
      <table>
        <tr><td>Zipcode: {this.state.zip}</td></tr>
      </table>
    );
  }
}

class City extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorCheck: false,
      city: [],
      array: [],
    };

    //handleZip's improperly named but changing names
    //seems to break the program
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleZipSubmit = this.handleZipSubmit.bind(this);
  }

  returnData()
  {
    var temp = this.state.array;
    var datatemp = [];

    if(this.state.errorCheck === false)
    {
      for(let i = 0; i < temp.length; i++)
        datatemp.push(<Zip data={temp[i]}/>)

      return datatemp;
    }

    else{
      return <div>Invalid Input</div>
    }

  }

  handleZipChange(zip){
    this.setState({
      city: zip.target.value.toUpperCase(),
    });
    console.log(this.state.city);
    console.log(this.state.array);
  }

  handleZipSubmit(zip){
    zip.preventDefault();
    fetch("http://ctp-zip-api.herokuapp.com/city/" + this.state.city)
    .then((response) => response.json())
    .then(data => {
      this.setState({
        errorCheck: false,
        array: data
    })
    console.log(data)
    console.log(this.state.errorCheck)
    })
    .catch((error) => {
      this.setState({
        errorCheck: true
      });
    }

  )
  }

  render(){
    return(
      <div>
      <form onSubmit={this.handleZipSubmit}>
        <label>
          Enter Zip:
          <textarea value={this.state.value} onChange={this.handleZipChange} />        
        </label>
        <input type="submit" value="Submit" />
        </form>
        {this.returnData()}
      </div>
    );
  }
}

export default City;

ReactDOM.render(
  <City />,
  document.getElementById('root')
);
