from scipy.sparse import csr_matrix
import numpy as np
from scattertext.termranking.TermRanker import TermRanker


class DocLengthNormalizedFrequencyRanker(TermRanker):
	'''Ranks terms, instead of their raw frequency, by their document-length adjusted frequency.
	This means that each term has a document-specific weight of  #(t,d)/|d|.
	'''
	def get_ranks(self):
		row = self._get_row_category_ids()
		X = self._get_X()
		doc_lengths = X.sum(axis=1)
		normX = self._get_normalized_X(X, doc_lengths)
		categoryX = csr_matrix((normX.data, (row, normX.indices)))
		return self._get_freq_df(categoryX)

	def _get_normalized_X(self, X, doc_lengths):
		return csr_matrix(doc_lengths.mean() * X.astype(np.float32) / doc_lengths)

