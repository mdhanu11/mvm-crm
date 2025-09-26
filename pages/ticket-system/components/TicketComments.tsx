import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

interface Comment {
  id: string;
  user: string;
  message: string;
  created_at: string;
}

interface Props {
  comments: Comment[];
  newComment: string;
  onChange: (val: string) => void;
  onAdd: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const TicketComments = ({ comments, newComment, onChange, onAdd, onKeyPress }: Props) => (
  <section>
    <h3 className="text-base font-semibold text-gray-900 mb-3">Comments ({comments.length})</h3>
    <div className="bg-gray-50 border border-gray-200 rounded-lg mb-4 max-h-60 overflow-y-auto p-4">
      {comments.length ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                <span className="text-xs text-gray-500">{comment.created_at}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic text-center py-8">No comments yet. Be the first to add one!</p>
      )}
    </div>

    <div className="flex gap-3">
      <Input
        variant="soft"
        value={newComment}
        onChange={(e) => {if (e.target.value.length <= 150) onChange(e.target.value);}}
        onKeyPress={onKeyPress}
        placeholder="Add a comment..."
      />
      <Button className="shrink-0" onClick={onAdd} disabled={!newComment.trim()}>Add Comment</Button>
    </div>
    <p className="text-xs text-gray-500 mt-1"><span className="text-red-400">{newComment.length}/150</span> | Press Enter to submit, or Shift+Enter for new line.</p> 
  </section>
);

export default TicketComments;
