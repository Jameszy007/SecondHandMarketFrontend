import React from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { uploadReview } from "../../service/api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class UploadReview extends React.Component {
  state = {
    loading: false,
  };

  fileInputRef = React.createRef();

  handleSubmit = async (values) => {
    const formData = new FormData();
    const { files } = this.fileInputRef.current;

    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    formData.append("rating", values.name);
    formData.append("review", values.address);
    formData.append("uploadDate", new Date());

    this.setState({
      loading: true,
    });
    try {
      await uploadReview(formData);
      message.success("upload successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <Form
        {...layout}
        onFinish={this.handleSubmit}
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        <Form.Item name="rating" label="Rate" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="review" label="Review" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="pictures"
          label="Pictures"
          rules={[{ required: true }]}
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={this.fileInputRef}
            multiple={true}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UploadReview;
