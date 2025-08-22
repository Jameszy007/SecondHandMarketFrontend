import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "antd";
import UploadReviewPage from "../pages/Review/UploadReviewPage";

export default function UploadReviewButton() {
  const [showForm, setShowForm] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/reviews/upload`);
    setUploaded(true);
    setTimeout(() => {
      setShowForm(false);
      setUploaded(false);
    }, 1500); // show "Uploaded!" for 1.5s
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <Button onClick={() => setShowForm(true)}>Upload Review</Button>

      {/* Floating Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Card className="w-96 p-4 rounded-2xl shadow-lg bg-white">
            <CardContent>
              {!uploaded ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <UploadReviewPage />
                </form>
              ) : (
                <p className="text-green-600 font-semibold text-center">
                  Uploaded!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
