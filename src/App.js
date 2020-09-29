import React, { Component } from 'react';
import './App.css';
const output = require("../src/colleges.json")


class App extends Component {

  constructor() {
    super();
    this.state = {
      page: 1,
      loadingMore: false,
      paginated_output: []
    }
    this.loadMore = this.loadMore.bind(this)
    this.getOfferText = this.getOfferText.bind(this)
  }


  // Initial component render
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.loadMore()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // Function for calling next paginated response
  loadMore() {
    this.setState({
      loadingMore: true,
      paginated_output: output.colleges.slice(0, this.state.page * 10),
      page: this.state.page + 1
    })

    this.setState({
      loadingMore: false
    })
  }

  // Function for infinite scroll
  handleScroll = () => {
    let scrollTop = window.scrollY;
    if (!this.state.loadingMore && (scrollTop + window.innerHeight) >= (document.querySelector('.one').offsetHeight - 500)) {
      this.loadMore();
    }
  }

  // Function for custom offer display
  getOfferText(offer_text) {

    var splitted_text = offer_text.split("Flat");
    var target_text = "Flat <b>" + splitted_text[1].toString() + "</b>";
    var span_list = ["2,000", "500", "LOGIN"];
    for (var i = 0; i < span_list.length; i++) {
      var text = span_list[i]
      var target_class = text === "LOGIN" ? "login" : "five";
      target_text = target_text.replace(text, "<span class='" + target_class + "'>" + text + "</span>")
    }

    return target_text;
  }

  render() {
    return (
      <div className="one">
        <div className="heading">
          <p className="two">Colleges in North India</p>
        </div>

        <div className="grid">

          {/* Mapping the respective output */}
          {this.state.paginated_output.map((college, index) => {
            return (
              <article>
                <div>
                  <div className="feature">
                    <span className="flag_offer">{college.promoted ? "PROMOTED" : null}<span></span></span>
                  </div>
                  <div className="position">
                    <p className="no"><span className="number"><b>{college.rating}</b></span><span className="out">/5</span></p>
                    <p className="good">{college.rating_remarks}</p>
                  </div>
                </div>
                <div className="image1">
                  <img className="image2" src={require("../src/assets/college_02.jpg")} alt="Sample alt" />
                </div>

                <div className="rank">
                  <div className="best-away">
                    <p className="best">{college.tags[0]}</p>
                    <p className="away">{college.tags[1]}</p>
                  </div>
                  <div className="college">
                    <p><b>#{college.ranking}</b></p>
                  </div>
                </div>

                <div className="row qaz">
                  <div className="column left">
                    <div className="text">
                      <div className="stars">
                        <p className="three">{college.college_name}</p>
                        <div className="review-star">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star empty_star"></i>
                        </div>
                      </div>
                      <p className="address">{college.nearest_place[0]} | <span className="four">{college.nearest_place[1]}</span>
                      </p>
                      <p className="address ad">
                        <span className="five"><b>93% Match : </b></span>
                        <span className="four">{college.famous_nearest_places}</span>
                      </p>

                      {/* Custom offer display section */}
                      <p id={"off_" + index} className="address ad edit" dangerouslySetInnerHTML={{ __html: this.getOfferText(college.offertext) }}></p>
                      <br />
                    </div>
                  </div>
                  <div className="column right">
                    <div className="feature">
                      <div className="coupon">
                        <p className="strike"><span>&#8377;</span>{college.original_fees}</p>
                        <p className="tag">20</p>
                      </div>
                      <br />
                      <div className="total-price">
                        <p className="price"><b>&#8377; {college.discounted_fees}</b></p>
                        <p className="period">{college.fees_cycle}</p>
                      </div>
                    </div>
                    <ul className="amenities">
                      <b>{college.amenties[0]}</b>
                      <span className="gap">
                        <li><b>{college.amenties[1]}</b></li>
                      </span>
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;