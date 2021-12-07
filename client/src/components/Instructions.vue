<template>
  <div class="col justify-content-center">
    <div class="instructions">
      <h1 class="text-center">
        {{ msg }}
      </h1>
      <ul class="list-group-sm list-group-flush">
        <li class="list-group-item">Sign into your Gmail account</li>
        <li class="list-group-item">Enter a Gmail query</li>
        <li class="list-group-item">Hit 'Delete' to move a message to the Junk Folder</li>
        <li class="list-group-item">
          Hit 'Trash' to permanently delete a message <b>(this cannot be undone!)</b>
        </li>
      </ul>
    </div>

    <div class="queries">
      <h1 class="text-center">
        SAMPLE QUERIES
      </h1>
      <table class="table table-sm table-borderless">
        <thead>
          <tr>
            <th class="table-light">QUERY</th>
            <th>RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-light"><i><b>list</b>:noreply@redditmail.com <b>in</b>:spam</i></td>
            <td>Delete all messages from the Reddit mailing list which are in the Spam folder</td>
          </tr>
          <tr>
            <td class="table-light"><i><b>before</b>:1/1/2000 <b>is</b>:unread</i></td>
            <td>Delete all messages before 1st Jan, 2000 which are unread</td>
          </tr>
          <tr>
            <td class="table-light"><i><b>label</b>:productivity</i></td>
            <td>Delete all messages with the productivity label</td>
          </tr>
          <tr>
            <td class="table-light"><i><b>from</b>:amazon <b>older_than</b>:12d</i></td>
            <td>Delete all messages from amazon which are older than 12 days</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
ul {
  text-align: left;
}

li {
  font-size: 20px;
}

.instructions {
  padding-bottom: 20px;
}

.queries {
  padding-top: 20px;
}

table {
  text-align:left;
  font-size: 18px;
  margin: auto;
  border-collapse: separate;
}
</style>

<script>
export default {
  name: 'Instructions',
  props: {
    msg: String,
  },
};
</script>
