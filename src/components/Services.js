import React, { Component } from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

import Title from "./Title";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info: "lorem asd asdadssadsa dasd asd sad sadas dasd asdsadas dsa dsad sadsa dsadsa dsadsadsadsadasdsadsa",
      },
      {
        icon: <FaHiking />,
        title: "endless hiking",
        info: "lorem asd asdadssadsa dasd asd sad sadas dasd asdsadas dsa dsad sadsa dsadsa dsadsadsadsadasdsadsa",
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle",
        info: "lorem asd asdadssadsa dasd asd sad sadas dasd asdsadas dsa dsad sadsa dsadsa dsadsadsadsadasdsadsa",
      },
      {
        icon: <FaBeer />,
        title: "strongest beer",
        info: "lorem asd asdadssadsa dasd asd sad sadas dasd asdsadas dsa dsad sadsa dsadsa dsadsadsadsadasdsadsa",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, i) => {
            return (
              <article key={i} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
