export default function Post(props) {
  return (
    <div className="post white-box">
      <div className="post-header">
        <h4>{props.title}</h4>
      </div>
      <div className="post-body">
        <p>{props.content}</p>
      </div>
      <div className="post-footer">
        <span>By {props.username}</span>
      </div>
    </div>
  );
}