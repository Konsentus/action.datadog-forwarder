# action.datadog-forwarder

This action allows a json file to be sent to datadog.

The action is able to always run no matter what the outcome of the proceeding jobs are by using

- `jobs.<job_id>.needs` with every action that is present in the workflow
- `jobs.<job_id>.if` set to always()

## Building the action

The action run by calling dist/index.js this file is created using ncc. To build this file please run `npm run build`

## Usage

### Output metrics to filesystem and then upload to artifacts.

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

obs:
  job1:
    name: First job
    runs-on: ubuntu-latest
    steps:
      # the rest of your action

  job2:
    name: Second job
    runs-on: ubuntu-latest
    steps:
      # the rest of your action

  build-metrics:
    runs-on: ubuntu-latest
    name: collect metrics
    needs: [job1, job2]
    if: always()
    steps:
      - name: Forward
        uses: konsentus/action.datadog-forwarder
        with:
          filename: 'output.json'
```
