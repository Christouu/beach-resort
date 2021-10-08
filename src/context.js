import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true,
      type: "all",
      capacity: 1,
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pets: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }

  formatData(items) {
    let tempItems = items.map((i) => {
      let id = i.sys.id;
      let images = i.fields.images.map((img) => {
        return img.fields.file.url;
      });

      let room = { ...i.fields, images, id };

      return room;
    });

    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);

    return room;
  };

  handleChange(e) {
    const target = e.target;
    const value = e.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  }

  filterRooms() {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state;

    let tempRooms = [...rooms];
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    this.setState({
      sortedRooms: tempRooms,
    });
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function WrappedComponent(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomConsumer, RoomProvider, RoomContext };
