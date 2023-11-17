import React from 'react';

export const CarouselPRO = () => {

  class CitiesSlider extends React.Component {
    constructor(props) {
      super(props);
      this.IMAGE_PARTS = 4;
      this.changeTO = null;
      this.AUTOCHANGE_TIME = 4000;
      this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }
    componentWillUnmount() {
      window.clearTimeout(this.changeTO);
    }
    componentDidMount() {
      this.runAutochangeTO();
      setTimeout(() => {
        this.setState({ activeSlide: 0, sliderReady: true });
      }, 0);
    }
    runAutochangeTO() {
      this.changeTO = setTimeout(() => {
        this.changeSlides(1);
        this.runAutochangeTO();
      }, this.AUTOCHANGE_TIME);
    }
    changeSlides(change) {
      window.clearTimeout(this.changeTO);
      const { length } = this.props.slides;
      const prevSlide = this.state.activeSlide;
      let activeSlide = prevSlide + change;
      if (activeSlide < 0) activeSlide = length - 1;
      if (activeSlide >= length) activeSlide = 0;
      this.setState({ activeSlide, prevSlide });
    }
    render() {
      const baseURL = window.location.origin;
      const { activeSlide, prevSlide, sliderReady } = this.state;
      return /*#__PURE__*/(
        React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }), style:{fontFamily:"Roboto"} }, /*#__PURE__*/
          React.createElement("p", { className: "slider__top-heading azul-oscuro fs-4", }, "E-Casa"), /*#__PURE__*/
          React.createElement("div", { className: "slider__slides" },
            this.props.slides.map((slide, index) => /*#__PURE__*/
              React.createElement("div", {
                className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
                key: slide.city
              }, /*#__PURE__*/
                React.createElement("div", { className: "slider__slide-content" }, /*#__PURE__*/
                  React.createElement("h3", { className: "slider__slide-subheading footer p-3 rounded" }, slide.country || slide.city), /*#__PURE__*/
                  React.createElement("h2", { className: "slider__slide-heading" },
                    slide.city.split('').map(l => /*#__PURE__*/React.createElement("span", { className: "footer p-3" }, l))), /*#__PURE__*/
                  React.createElement("a", { className: "slider__slide-subheading azul-oscuro bg-white rounded py-2 px-3 fs-4", href: baseURL + "/comp-nosotros" }, "conocer más")), /*#__PURE__*/
                React.createElement("div", { className: "slider__slide-parts" },
                  [...Array(this.IMAGE_PARTS).fill()].map((x, i) => /*#__PURE__*/
                    React.createElement("div", { className: "slider__slide-part", key: i }, /*#__PURE__*/
                      React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))), /*#__PURE__*/
          React.createElement("div", { className: "slider__control", onClick: () => this.changeSlides(-1) }), /*#__PURE__*/
          React.createElement("div", { className: "slider__control slider__control--right", onClick: () => this.changeSlides(1) })));
    }
  }
  const slides = [

    {
      city: 'E-Casa',
      country: 'Bienvenido a',
      img: 'https://res.cloudinary.com/dbviwbvqr/image/upload/v1700149590/p2wx7u5v7awmgw7dvgzs.jpg'
    },

    {
      city: 'tu lugar',
      country: 'Encuentra aquí',
      img: 'https://res.cloudinary.com/dbviwbvqr/image/upload/v1700156194/uuscgazeavpf7epy2oao.jpg'
    },

  ];

  return (
    <div id="carrouse-pro">{React.createElement(CitiesSlider, { slides: slides })}</div>
  );
};