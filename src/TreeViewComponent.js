import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  nestedList: {
    paddingLeft: theme.spacing.unit * 3
  },
  listItem: {
    paddingLeft: theme.spacing.unit
  },
  listItemText: {
    paddingLeft: 0,
    display: "flex",
    alignItems: "center"
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    },
    "& svg": {
      color: theme.palette.common.white
    }
  }
});

class TreeView extends React.PureComponent {
  state = {
    expanded: {}
  };

  handleClick = node => {
    if (this.isLeaf(node)) {
      this.props.onSelect(node);
      return;
    }

    const expanded = Object.assign({}, this.state.expanded);
    if (expanded[node.id]) {
      delete expanded[node.id];
    } else {
      expanded[node.id] = node;
    }
    this.setState({ expanded: expanded });
  };

  handleExpanded(id) {
    return !this.state.expanded[id];
  };

  handleSelect(node){
    return this.props.selected && this.props.selected.id === node.id;
  };

  isLeaf(node){
    return typeof node.children === "undefined";
  };

  recursiveList(node, index){
    const { classes, getIcon, getTitle } = this.props;
    const isLeaf = this.isLeaf(node);

    let children;
    console.log(node);
    if (!isLeaf) {
      children = node.children.map((node, i) => this.recursiveList(node, i));
    }

    const nodeId = `node-${node.id}-${index}`;
    const expanded = this.handleExpanded(node.id);
    const nodeIcon =
    typeof getIcon === "function" ? getIcon(node, isLeaf, expanded) : null;
    const nodeTitle =
      typeof getTitle === "function"
        ? getTitle(node, isLeaf, expanded)
        : node.title;

    return (
      <div key={nodeId}>
        <ListItem
          button
          className={
            this.handleSelect(node)
              ? `${classes.listItem} ${classes.selected}`
              : classes.listItem
          }
          onClick={() => this.handleClick(node)}
        >
          {nodeIcon && <ListItemIcon>{nodeIcon}</ListItemIcon>}
          <ListItemText primary={nodeTitle} className={classes.listItemText} />
          {!isLeaf && (expanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {!isLeaf &&
          children && (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <List className={`${classes.list} ${classes.nestedList}`}>
                {children}
              </List>
            </Collapse>
          )}
      </div>
    );
  };

  render() {
    const { classes, data } = this.props;
    const tree = Array.isArray(data) ? data : [];
    console.log(tree);
    return (
      <List className={classes.list}>
        {tree.map((node, i) => this.recursiveList(node, i))}
      </List>
    );
  }
}

TreeView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  getIcon: PropTypes.func,
  getTitle: PropTypes.func
};

export default withStyles(styles)(TreeView);
