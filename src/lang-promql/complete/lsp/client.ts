// The MIT License (MIT)
//
// Copyright (c) 2020 The Prometheus Authors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import axios from 'axios';
import { CompletionItem } from 'vscode-languageserver-types';

export interface LSPBody {
  expr: string;
  limit: number;
  positionLine?: number;
  positionChar?: number;
}

// LSPClient is the HTTP client that should be used to get some information from the different endpoint provided by langserver-promql.
export class LSPClient {
  private readonly url: string;
  private readonly autocompleteEndpoint = '/completion';

  constructor(url: string) {
    this.url = url;
  }

  complete(body: LSPBody): Promise<CompletionItem[]> {
    return axios.post<CompletionItem[]>(this.url + this.autocompleteEndpoint, body).then((response) => {
      return response.data ? response.data : [];
    });
  }
}
