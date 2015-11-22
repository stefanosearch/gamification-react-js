import React, { PropTypes } from 'react'
import { Table } from 'antd';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="javascript:;">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];
const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  getCheckboxProps: function(record) {
    return {
      defaultChecked: record.name === '李大嘴', // 配置默认勾选的列
      disabled: record.name === '胡彦祖'    // 配置无法勾选的列
    };
  },
  onSelect: function(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: function(selected, selectedRows) {
    console.log(selected, selectedRows);
  }
};

const DataGridComponent = React.createClass({
    render () {
        return (
            <div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data} />
            <Tree
                defaultExpandAll={true}
                checkable={true}
                onCheck={alert("fuck")}>
                <TreeNode title="parent 1">
                    <TreeNode title="leaf" />
                    <TreeNode title="parent 1-1">
                        <TreeNode title="parent 2-1">
                            <TreeNode title="leaf" />
                            <TreeNode title="leaf" />
                        </TreeNode>
                        <TreeNode title="leaf" />
                    </TreeNode>
                </TreeNode>
            </Tree>
            </div>
        )
    }
})

export default DataGridComponent
