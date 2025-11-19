import { Markdown } from "./markdown";
import { GitHubRelease } from "../types";
import { Focusable } from "@decky/ui";

function ChangeLogModal({
  release,
  closeModal,
}: {
  release: GitHubRelease;
  closeModal?: () => {};
}) {
  return (
    // @ts-ignore
    <Focusable onCancelButton={closeModal}>
      {/* @ts-ignore */}
      <Focusable
        onActivate={() => {}}
        style={{
          marginTop: "40px",
          height: "calc( 100% - 40px )",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          margin: "40px",
        }}
      >
        <div>
          <h1>{release.name}</h1>
          {release.body ? (
            <Markdown children={String(release.body)} />
          ) : (
            "no patch notes for this version"
          )}
        </div>
      </Focusable>
    </Focusable>
  );
}

export default ChangeLogModal;
