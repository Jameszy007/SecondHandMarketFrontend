import UploadReviewButton from "../../component/UploadReviewButton";
import PostingPage from "../Posting/PostingPage";

class PostingButton extends React.Component {
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
    return (
      <>
        <Button onClick={this.openModal} shape="round">
          Post Items
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
            <PostingPage />
          </Modal>
        )}
      </>
    );
  }
}

export default function Home() {
  console.log("render: Home");
  return (
    <div>
      <PostingButton />
    </div>
  );
}
