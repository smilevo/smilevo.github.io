---
# Documentation: https://wowchemy.com/docs/managing-content/

title: On the documentation of refactoring types
subtitle: ''
summary: ''
authors:
- Eman Abdullah AlOmar
- Jiaqian Liu
- Kenneth Addo
- Mohamed Wiem Mkaouer
- Christian Newman
- Ali Ouni
- Zhe Yu
tags: []
categories: []
date: '2022-02-01'
lastmod: 2022-01-26T01:31:46-05:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ''
  focal_point: ''
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
publishDate: '2022-02-26T06:31:43.955730Z'
publication_types:
- '2'
abstract: 'Commit messages are the atomic level of software documentation. They provide a natural language description of the code change and its purpose. Messages are critical for software maintenance and program comprehension. Unlike documenting feature updates and bug fixes, little is known about how developers document their refactoring activities. Specifically, developers can perform multiple refactoring operations, including moving methods, extracting classes, renaming attributes, for various reasons, such as improving software quality, managing technical debt, and removing defects. Yet, there is no systematic study that analyzes the extent to which the documentation of refactoring accurately describes the refactoring operations performed at the source code level. Therefore, this paper challenges the ability of refactoring documentation, written in commit messages, to adequately predict the refactoring types, performed at the commit level. Our analysis relies on the text mining of commit messages to extract the corresponding features (i.e., keywords) that better represent each class (i.e., refactoring type). The extraction of text patterns, specific to each refactoring type (e.g., rename, extract, move,inline, etc.) allows the design of a model that verifies the consistency of these patterns with their corresponding refactoring. Such verification process can be achieved via automatically predicting, for a given commit, the methodlevel type of refactoring being applied, namely Extract Method, Inline Method, Move Method, Pull-up Method, Push-down Method, and Rename Method. We compared various classifiers, and a baseline keyword-based approach, in terms of their prediction performance, using a dataset of 5,004 commits. Our main findings show that the complexity of refactoring type prediction varies from one type to another. Rename method and Extract method were found to be the best documented refactoring activities, while Pull-up Method, and Push-down Method were the hardest to be identified via textual descriptions. Such findings bring the attention of developers to the necessity of paying more attention to the documentation of these types.'
publication: '*Automated Software Engineering*'
---
