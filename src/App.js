// author: Ankit Kadali

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import TreeView from './TreeViewComponent.js';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  section: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const json =
[{"id": 1,
"lineNo": 9,
"parent": "system",
  "title": 'Folder-1',
  "children": [
    {
      "id": 2,
      "title": 'reports-1',
      "children": [{ "id": 3, "title": 'file 2',"lineNo": 9,
      "parent": "system" }, { "id": 4, "title": 'file 3',"lineNo": 9,
      "parent": "system" }]
    },
    { "id": 5,"lineNo": 9,"parent": "system", "title": 'file 1', }
  ]},

{"id": 6,
"lineNo": 9,
"parent": "system",
  "title": 'Folder-2',
  "children": [
    {
      "id": 7,
      "title": 'reports-2',
      "children": [{ "id": 8, "lineNo": 9,"parent": "system","title": 'file 1' }, { "id": 9,"lineNo": 9,
      "parent": "system", "title": 'file 2' }]
    },
    { "id": 10,"lineNo": 9,"parent": "system", "title": 'file 3' }
  ]
}];

class TreeviewDemo extends React.Component {
  state = {
    expanded: {},
    selected: null
  };

  onSelect = node => {
    console.log(`${node.name} selected`);
  };

  getIcon = (node, isLeaf, isExpanded) => {
    return isLeaf ? (
      <InsertDriveFileIcon />
    ) : isExpanded ? (
      <FolderOpenIcon />
    ) : (
      <FolderIcon />
    );
  };

  render() {
    const { classes } = this.props;
    const { selected } = this.state;

    return (
      <div className={classes.root}>

        <Typography variant="subheading" className={classes.section}>Tree view</Typography>
        <Paper>
          <TreeView
            data={json}
            selected={selected}
            onSelect={this.onSelect}
            getIcon={this.getIcon}
          />
        </Paper>
              </div>
        // <Typography variant="subheading" className={classes.section}>Tree view rendering children directly</Typography>
        // <Paper>
        //   <TreeView
        //     data={json.children}
        //     selected={selected}
        //     onSelect={this.onSelect}
        //     getIcon={this.getIcon}
        //   />
        // </Paper>

    );
  }
}

TreeviewDemo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TreeviewDemo);
//export default App;
