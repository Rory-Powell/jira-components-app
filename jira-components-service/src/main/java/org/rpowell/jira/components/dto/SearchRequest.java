package org.rpowell.jira.components.dto;

import java.util.Objects;

public class SearchRequest {

    private String jql;
    private long startAt;
    private long maxResults;

    public SearchRequest() { }

    public SearchRequest(String jql,
                         long startAt,
                         long maxResults) {
        this.jql = jql;
        this.startAt = startAt;
        this.maxResults = maxResults;
    }

    public String getJql() {
        return jql;
    }

    public void setJql(String jql) {
        this.jql = jql;
    }

    public long getStartAt() {
        return startAt;
    }

    public void setStartAt(long startAt) {
        this.startAt = startAt;
    }

    public long getMaxResults() {
        return maxResults;
    }

    public void setMaxResults(long maxResults) {
        this.maxResults = maxResults;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SearchRequest that = (SearchRequest) o;
        return startAt == that.startAt &&
                maxResults == that.maxResults &&
                Objects.equals(jql, that.jql);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jql, startAt, maxResults);
    }

    @Override
    public String toString() {
        return "SearchRequest{" +
                "jql='" + jql + '\'' +
                ", startAt=" + startAt +
                ", maxResults=" + maxResults +
                '}';
    }
}
