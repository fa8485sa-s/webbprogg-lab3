import { Component } from "react";
import SaladSelect from "./SaladSelect";
import SaladCheckbox from "./SaladCheckbox";
import Salad from "./Salad";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFoundation: "Sallad",
      selectedProtein: "Kycklingfilé",
      selectedExtras: [],
      selectedDressing: "Ceasardressing",
    };

    this.handleChangeFoundation = this.handleChangeFoundation.bind(this);
    this.handleChangeProtein = this.handleChangeProtein.bind(this);
    this.handleChangeExtras = this.handleChangeExtras.bind(this);
    this.handleChangeDressing = this.handleChangeDressing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFoundation(event) {
    this.setState({ selectedFoundation: event.target.value });
  }

  handleChangeProtein(event) {
    this.setState({ selectedProtein: event.target.value });
  }

  handleChangeExtras(event) {
    let value = event.target.checked;
    let extras = this.state.selectedExtras;

    if (value) {
      extras.push(event.target.name);
    } else {
      extras.splice(extras.indexOf(event.target.name), 1);
    }

    this.setState({ selectedExtras: extras });
  }

  handleChangeDressing(event) {
    this.setState({ selectedDressing: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let foundation = this.state.selectedFoundation;
    let protein = this.state.selectedProtein;
    let extras = this.state.selectedExtras;
    let dressing = this.state.selectedDressing;

    let propsFoundation = this.props.inventory[foundation];
    let propsProtein = this.props.inventory[protein];
    let propsDressing = this.props.inventory[dressing];
    // let propsExtras = extras.map((ext) => this.props.inventory[ext]);

    // console.log(
    //   "Foundation: %s, Protein: %s, Extras: %s, Dressing: %s",
    //   foundation,
    //   protein,
    //   extras,
    //   dressing
    // );

    // let propertiesOfSalad = [
    //   propsFoundation,
    //   propsProtein,
    //   propsExtras,
    //   propsDressing,
    // ];

    //propertiesOfSalad.forEach((prop) => console.log(prop));

    //extras.forEach((e) => console.log(e, this.props.inventory[e]));

    let mySalad = new Salad();

    mySalad
      .add(foundation, propsFoundation)
      .add(protein, propsProtein)
      .add(dressing, propsDressing);
    extras.forEach((e) => mySalad.add(e, this.props.inventory[e]));

    console.log("ORDERED SALAD:");
    mySalad.viewSalad();

    console.log("Cost: %s kr", mySalad.getPrice());
    console.log("Number of extras: ", mySalad.count("extra"));

    //reset form
    this.setState({ selectedFoundation: "Sallad" });
    this.setState({ selectedProtein: "Kycklingfilé" });
    this.setState({ selectedExtras: [] });
    this.setState({ selectedDressing: "Ceasardressing" });

    //then pass the created Salad object to parent component (App.js)
    this.props.addToCart(mySalad);
    window.alert("du la till en sallad")
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(
      (name) => inventory[name].foundation
    );
    let proteins = Object.keys(inventory).filter(
      (name) => inventory[name].protein
    );
    let extras = Object.keys(inventory).filter((name) => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(
      (name) => inventory[name].dressing
    );
    return (
      <div className="h-200 p-5 bg-light border rounded-3">
        <h2>Compose a salad</h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Foundation</h4>
          <label htmlFor="selectFoundation">Select your foundation: </label>
          <select
            className="form-select"
            onChange={this.handleChangeFoundation}
            value={this.state.selectedFoundation}
          >
            {foundations.map((foundation) => (
              <SaladSelect
                selection={foundation}
                key={foundation}
              ></SaladSelect>
            ))}
          </select>
          <br />
          <h4>Protein</h4>
          <label htmlFor="selectProtein">Select your protein: </label>
          <select
            className="form-select"
            onChange={this.handleChangeProtein}
            value={this.state.selectedProtein}
          >
            {/* <option value="make_choice">Gör ditt val:</option> */}
            {proteins.map((protein) => (
              <SaladSelect selection={protein} key={protein}></SaladSelect>
            ))}
          </select>
          <br />
          <h4>Extra</h4>
          <label htmlFor="checkExtras">Select your extras: </label>
          {extras.map((extra) => (
            <SaladCheckbox
              key={extra}
              handling={this.handleChangeExtras}
              selection={extra}
              selected={this.state.selectedExtras.includes(extra)}
            ></SaladCheckbox>
          ))}
          <br />
          <h4>Dressing</h4>
          <label htmlFor="selectDressing">Select dressing: </label>
          <select
            className="form-select"
            onChange={this.handleChangeDressing}
            value={this.state.selectedDressing}
          >
            {dressings.map((dressing) => (
              <SaladSelect selection={dressing} key={dressing}></SaladSelect>
            ))}
          </select>
          <br />
          <br />
          <input
            className="btn btn-outline-primary"
            type="submit"
            value="Add to shopping cart"
            onSubmit={this.handleSubmit}
          />
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
