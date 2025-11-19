import { Markdown } from "./markdown";
import { GitHubRelease } from "../types";
import { ModalRoot, DialogButton, Focusable } from "@decky/ui";
import { useEffect, useRef } from "react";

function ChangeLogModal({
  release,
  closeModal,
}: {
  release: GitHubRelease;
  closeModal?: () => void;
}) {
  const focusableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusableRef.current) {
        focusableRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ModalRoot onCancel={closeModal}>
      <div style={{
        marginBlockStart: "-20px",
        padding: "0px",
        maxWidth: "90vw",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}>
        <h1 style={{ marginBottom: "15px", textAlign: "center", fontSize: "24px" }}>{release.name}</h1>
        {/* @ts-ignore */}
        <Focusable
          ref={focusableRef}
          onActivate={() => { }}
          onOKButton={() => { }}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.3)"
          }}
        >
          {release.body ? (
            <Markdown children={String(release.body)} />
          ) : (
            <div style={{ textAlign: "center", color: "#888" }}>
              No patch notes available for this version
            </div>
          )}
        </Focusable>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <DialogButton onClick={closeModal}>
            Close
          </DialogButton>
        </div>
      </div>
    </ModalRoot>
  );
}

export default ChangeLogModal;
