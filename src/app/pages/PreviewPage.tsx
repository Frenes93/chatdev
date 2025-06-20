import localStore from "~services/storage/local-store";
import {useEffect} from "react";
import {createRoot} from "react-dom/client";

function PreviewPage() {
  useEffect(() => {
    const root = createRoot(document.documentElement)
    root.render(<html dangerouslySetInnerHTML={{__html: localStore.get("task_html") ?? ""}} />)
  }, [])
}

export default PreviewPage
