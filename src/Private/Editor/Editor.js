import React, { Component } from "react";

import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditor from "react-froala-wysiwyg";

import "formdata-polyfill";

const uploadFile = file => {
  let data = new FormData();
  data.append("data", file);
  return new Promise((resolve, reject) => {
    fetch("https://api.graph.cool/file/v1/cj5d00pfwhkbq01220oq1ul7i", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.json();
      })
      .then(file => {
        resolve(file);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export default class Editor extends Component {
  state = {};
  render() {
    return (
      <FroalaEditor
        tag="textarea"
        config={{
          placeholderText: "Contenu de l'article",
          charCounterCount: false,
          events: {
            "froalaEditor.image.inserted": (e, editor, $img, response) => {
              const src = $img[0].src;
              fetch(src)
                .then(res => res.blob())
                .then(async data => {
                  var file = new File([data], "image.jpg");
                  try {
                    const { url } = await uploadFile(file);
                    $img[0].src = url;
                  } catch (e) {
                    console.error(e);
                  }
                });
            }
          }
        }}
        model={this.props.model}
        onModelChange={this.props.onModelChange}
      />
    );
  }
}
