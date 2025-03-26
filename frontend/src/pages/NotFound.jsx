import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <div className="notfound">
      <div>
        <div>404</div>
        <div>Page Not Found</div>
        <Link to="/">Back to home page</Link>
      </div>
    </div>
  );
}
