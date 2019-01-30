import React from 'react';
import { Link } from 'gatsby';
import styles from "./side-nav.module.css";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null
    this.state = {
      currentAnchor: this.props.pageAnchors[0],
      currentAnchorIndex: 0,
      headerPinned: true,
    }
  }

  componentDidMount() {
    this.calcCurrentAnchor = this.calcCurrentAnchor.bind(this);
    this.interval = setInterval(this.calcCurrentAnchor, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calcCurrentAnchor() {
    //const prevAnchorIndex = this.state.currentAnchorIndex;
    const pageAnchors = this.props.pageAnchors;
    for (let i = 0; i < pageAnchors.length; i++) {
      if (this.props.currentOffset > pageAnchors[i].offsetTop - 15) {
        // if (i-1 === prevAnchorIndex || i+1 === prevAnchorIndex) { //check if consecutive, if not need to track between
          if (i+1 === pageAnchors.length) {//at last anchor, can't check next
            // let currentAnchor = pageAnchors[i];
            // this.moveToCurrentAnchor(prevAnchorIndex, i, pageAnchors);
            // this.setState({
            //   currentAnchor: currentAnchor,
            //   currentAnchorIndex: i
            // });
            break;
          } else if (this.props.currentOffset < pageAnchors[i+1].offsetTop) {
            // let currentAnchor = pageAnchors[i];
            // this.moveToCurrentAnchor(prevAnchorIndex, i, pageAnchors);
            // this.setState({
            //   currentAnchor: currentAnchor,
            //   currentAnchorIndex: i
            // });
            // console.log('set new active anchor. index, prevIndex:', i, prevAnchorIndex)
            break;
          }
        // }
      }
    }
  }

  // moveToCurrentAnchor(prevIndex, newIndex, pageAnchors) {
  //   while (prevIndex !== newIndex) {
  //     if (prevIndex < newIndex) {
  //       prevIndex += 1;
  //       this.setState({
  //         currentAnchor: pageAnchors[prevIndex],
  //         currentAnchorIndex: prevIndex
  //       });
  //     } else if (prevIndex > newIndex) {
  //       prevIndex -= 1;
  //       this.setState({
  //         currentAnchor: pageAnchors[prevIndex],
  //         currentAnchorIndex: prevIndex
  //       });
  //     }
  //     setTimeout(() => null, 100);
  //   }
  // }

  styleIfActive(itemAnchor) {
    if (this.state.currentAnchor) {
      let currentAnchor = this.props.route + this.state.currentAnchor.getAttribute('href')
      if (itemAnchor === currentAnchor) {
        return null
        // return {
        //   color: '#61b5d9',
        //   fontWeight: 'bold'
        // }
      } else {
        return null
      }
    }
  }

  render() {
    const { content } = this.props
    return(
      <div className={styles.sideNav}>
        {content.map((section, index) =>
          <ul key={index} className="list-unstyled">
            <li><Link to={section.anchor} style={this.styleIfActive(section.anchor)}>{section.name}</Link>
              <ul className="list-unstyled">
                {section.children && section.children.map((firstChild, index) =>
                  <li key={index}>
                    <Link to={firstChild.anchor} style={this.styleIfActive(firstChild.anchor)}>{firstChild.name}</Link>
                    {firstChild.children && firstChild.children.map((secondChild, index) =>
                      <ul key={index} className="list-unstyled">
                        <li><Link to={secondChild.anchor} style={this.styleIfActive(secondChild.anchor)}>{secondChild.name}</Link>
                          <ul className="list-unstyled">
                            {secondChild.children && secondChild.children.map((thirdChild, index) =>
                              <li key={index}>
                                <Link to={thirdChild.anchor} style={this.styleIfActive(thirdChild.anchor)}>{thirdChild.name}</Link>
                              </li>
                            )}
                          </ul>
                        </li>
                      </ul>
                    )}
                  </li>
                )}
              </ul>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default SideNav
