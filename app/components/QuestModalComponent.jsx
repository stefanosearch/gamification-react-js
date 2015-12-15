import React, { PropTypes } from 'react'
import { Modal, Button, Icon } from 'antd';
import { Form, Input, Col, Slider, InputNumber, Select, Datepicker, Timepicker} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;


const QuestModalComponent = React.createClass({
  mixins: [Form.ValueMixin],
  getInitialState() {
    return {
        visible: false,
        loading: false,
        formData: {
          text: '',
          note: '',
          exp: 0,
          gold: 0,
          type: this.props.current.navType.toString(),
          alert_at: '',
          deadline_at: ''
        }
     };
  },
  showModal() {
    this.setState({
      visible: true,
      formData: {...this.state.formData,
        type: this.props.current.navType.toString()
      }
    });
  },
  handleOk() {
    let formData = this.state.formData;
    let options = {};
    if(formData.note){
      options.note = formData.note;
    }
    if(formData.exp){
      options.exp = formData.exp;
    }
    if(formData.gold){
      options.gold = formData.gold;
    }
    if(formData.alert_at){
      options.alert_at = formData.alert_at;
    }
    if(formData.deadline_at){
      options.deadline_at = formData.deadline_at;
    }
    this.props.onFetchAddQuest(formData.text,formData.type,options);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  handleDeadlineAtChange(from, value) {
    this.result = this.result || new Date();
    if (!value) {
      if (from === 'date') {
        this.selectedDate = false;
      } else {
        this.selectedTime = false;
      }
    } else {
      if (from === 'date') {
        this.result.setFullYear(value.getFullYear());
        this.result.setMonth(value.getMonth());
        this.result.setDate(value.getDate());
        this.selectedDate = true;
      } else {
        this.result.setHours(value.getHours());
        this.result.setMinutes(value.getMinutes());
        this.selectedTime = true;
      }
    }
    let deadline_at = '';
    if (this.selectedDate && this.selectedTime) {
      deadline_at += this.result.getFullYear() + "-"
      deadline_at += this.result.getMonth() + "-"
      deadline_at += this.result.getDate() + " "
      deadline_at += this.result.getHours() + ":"
      deadline_at += this.result.getMinutes() + ":00"
    }
    this.setState({
      formData: {
        ...this.state.formData,
        deadline_at
      }
    });
  },
  handleAlertAtChange(from, value) {
    this.result = this.result || new Date();
    if (!value) {
      if (from === 'date') {
        this.selectedDate = false;
      } else {
        this.selectedTime = false;
      }
    } else {
      if (from === 'date') {
        this.result.setFullYear(value.getFullYear());
        this.result.setMonth(value.getMonth());
        this.result.setDate(value.getDate());
        this.selectedDate = true;
      } else {
        this.result.setHours(value.getHours());
        this.result.setMinutes(value.getMinutes());
        this.selectedTime = true;
      }
    }

    let alert_at = '';
    if (this.selectedDate && this.selectedTime) {
      alert_at += this.result.getFullYear() + "-"
      alert_at += this.result.getMonth() + "-"
      alert_at += this.result.getDate() + " "
      alert_at += this.result.getHours() + ":"
      alert_at += this.result.getMinutes() + ":00"
    }
    this.setState({
      formData: {...this.state.formData,
        alert_at
      }
    });
  },
  render() {
      return (
          <div>
              <Button
                  type="ghost"
                  size="large"
                  onClick={this.showModal}>
                  <Icon type="plus" />
                  添加
              </Button>
              <Modal
                  title= "添加任务"
                  width="800"
                  visible={this.state.visible}
                  confirmLoading={this.state.loading}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}>
                  <Form horizontal>
                      <FormItem>
                          <Input
                              type="textarea"
                              placeholder="任务标题"
                              name="text"
                              value={this.state.formData.text}
                              onChange={this.setValue.bind(this, 'text')} />
                      </FormItem>
                      <FormItem>
                          <Input
                              type="textarea"
                              placeholder="备注"
                              name="note"
                              value={this.state.formData.note}
                              onChange={this.setValue.bind(this, 'note')} />
                      </FormItem>
                      <FormItem
                          label="EXP："
                          labelCol={{span: 2}}
                          wrapperCol={{span: 16}}>
                          <div className="row">
                              <div className="col-20">
                                  <Slider
                                      min={0}
                                      max={9}
                                      marks={[0,1,2,3,4,5,6,7,8,9]}
                                      onChange={this.setValue.bind(this, 'exp')}
                                      value={this.state.formData.exp} />
                              </div>
                              <div className="col-4">
                                  <InputNumber
                                      min={0}
                                      max={900}
                                      style={{marginLeft: '16px'}}
                                      value={this.state.formData.exp}
                                      onChange={this.setValue.bind(this, 'exp')} />
                              </div>
                          </div>
                      </FormItem>
                      <FormItem
                          label="GOLD："
                          labelCol={{span: 2}}
                          wrapperCol={{span: 16}}>
                          <div className="row">
                              <div className="col-20">
                                  <Slider
                                      min={0}
                                      max={9}
                                      marks={[0,1,2,3,4,5,6,7,8,9]}
                                      onChange={this.setValue.bind(this, 'gold')}
                                      value={this.state.formData.gold} />
                              </div>
                              <div className="col-4">
                                  <InputNumber
                                      min={0}
                                      max={900}
                                      style={{marginLeft: '16px'}}
                                      value={this.state.formData.gold}
                                      onChange={this.setValue.bind(this, 'gold')} />
                              </div>
                          </div>
                      </FormItem>
                      <FormItem
                          label="任务类型："
                          labelCol={{span: 2}}
                          wrapperCol={{span: 16}}>
                          <Select
                              value={this.state.formData.type}
                              onChange={this.setValue.bind(this, 'type')}
                              style={{width:120}}
                              name="type">
                              <Option value="1">今日待办</Option>
                              <Option value="2">下一步行动</Option>
                              <Option value="3">等待中</Option>
                              <Option value="0">收集箱</Option>
                          </Select>
                      </FormItem>
                      <FormItem
                          label="截止时间："
                          labelCol={{span: 2}}
                          wrapperCol={{span: 16}}>
                          <div className="row">
                              <div className="col-6">
                                  <Datepicker
                                      format="yyyy/MM/dd"
                                      onChange={this.handleDeadlineAtChange.bind(null, 'date')} />
                              </div>
                              <div className="col-6">
                                  <Timepicker
                                      format="HH:mm"
                                      minuteOptions={[0, 15, 30 ,45]}
                                      onChange={this.handleDeadlineAtChange.bind(null, 'time')} />
                              </div>
                          </div>
                      </FormItem>
                      <FormItem
                          label="提醒时间："
                          labelCol={{span: 2}}
                          wrapperCol={{span: 16}}>
                          <div className="row">
                              <div className="col-6">
                                  <Datepicker
                                      format="yyyy/MM/dd"
                                      onChange={this.handleAlertAtChange.bind(null, 'date')} />
                              </div>
                              <div className="col-6">
                                  <Timepicker
                                      format="HH:mm"
                                      minuteOptions={[0, 15, 30 ,45]}
                                      onChange={this.handleAlertAtChange.bind(null, 'time')} />
                              </div>
                          </div>
                      </FormItem>
                      <FormItem
                          label="爹任务："
                          labelCol={{span: 2}}
                          wrapperCol={{span: 16}}>
                          <Select
                              style={{width: '100%'}}
                              searchPlaceholder="选择爹任务"
                              tags
                              onChange={() => {}}>
                              <Option value="1">今日待办</Option>
                              <Option value="2">下一步行动</Option>
                              <Option value="3">等待中</Option>
                              <Option value="0">收集箱</Option>
                              <OptGroup label="四大根分类">
                                  <Option value="1">今日待办</Option>
                                  <Option value="2">下一步行动</Option>
                                  <Option value="3">等待中</Option>
                                  <Option value="0">收集箱</Option>
                              </OptGroup>
                          </Select>
                      </FormItem>
                  </Form>
              </Modal>
          </div>
      )
  }
})
export default QuestModalComponent