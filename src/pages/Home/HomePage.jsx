import {
  message,
  Tabs,
  List,
  Card,
  Image,
  Carousel,
  Button,
  Space,
  Modal,
  Tooltip,
} from "antd";
import {
  InfoCircleOutlined,
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import { deleteReview, getReviewsBySeller } from "../../service/api";
import UploadReview from "../Review/UploadReview";

const { TabPane } = Tabs;

class ReviewList extends React.Component {
  state = {
    loading: false,
    reviews: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getReviewsBySeller(this.props.reviewId);
      this.setState({
        reviews: resp,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { loading, reviews } = this.state;

    return (
      <List
        loading={loading}
        dataSource={reviews}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              description={
                <>
                  <Text>Upload Date: {item.uploadDate}</Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

class ViewReviewsButton extends React.Component {
  state = {
    modalVisible: false,
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { review } = this.props;
    const { modalVisible } = this.state;

    const modalTitle = `Reviews`;

    return (
      <>
        <Button onClick={this.openModal} shape="round">
          View Reviews
        </Button>
        {modalVisible && (
          <Modal
            title={modalTitle}
            centered={true}
            visible={modalVisible}
            closable={false}
            footer={null}
            onCancel={this.handleCancel}
            destroyOnClose={true}
          >
            <ReviewList reviewId={review.id} />
          </Modal>
        )}
      </>
    );
  }
}

class RemoveReviewButton extends React.Component {
  state = {
    loading: false,
  };

  handleRemoveReview = async () => {
    const { stay, onRemoveSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await deleteReview(stay.id);
      onRemoveSuccess();
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
      <Button
        loading={this.state.loading}
        onClick={this.handleRemoveReview}
        danger={true}
        shape="round"
        type="primary"
      >
        Remove Review
      </Button>
    );
  }
}

export class ReviewDetailInfoButton extends React.Component {
  state = {
    modalVisible: false,
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { review } = this.props;
    const { description, uploadDate } = review;
    const { modalVisible } = this.state;
    return (
      <>
        <Tooltip title="View Review Details">
          <Button
            onClick={this.openModal}
            style={{ border: "none" }}
            size="large"
            icon={<InfoCircleOutlined />}
          />
        </Tooltip>
        {modalVisible && (
          <Modal
            title={name}
            centered={true}
            visible={modalVisible}
            closable={false}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Space direction="vertical">
              <Text strong={true}>Description</Text>
              <Text type="secondary">{description}</Text>
              <Text strong={true}>uploadDate</Text>
              <Text type="secondary">{uploadDate}</Text>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}

class MyReviews extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getReviewsBySeller();
      this.setState({
        data: resp,
      });
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
      <List
        loading={this.state.loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item.id}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.name}
                  </Text>
                  <ReviewDetailInfoButton review={item} />
                </div>
              }
              actions={[<ViewReviewsButton review={item} />]}
              extra={
                <RemoveReviewButton
                  stay={item}
                  onRemoveSuccess={this.loadData}
                />
              }
            >
              <Carousel
                dots={false}
                arrows={true}
                prevArrow={<LeftCircleFilled />}
                nextArrow={<RightCircleFilled />}
              >
                {item.images.map((image, index) => (
                  <div key={index}>
                    <Image src={image} width="100%" />
                  </div>
                ))}
              </Carousel>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="My Reviews" key="1">
          <MyReviews />
        </TabPane>
        <TabPane tab="Upload Review" key="2">
          <UploadReview />
        </TabPane>
      </Tabs>
    );
  }
}

export default HomePage;
