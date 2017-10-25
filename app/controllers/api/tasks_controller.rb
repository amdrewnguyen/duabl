class Api::TasksController < ApplicationController
  before_action :require_logged_in, only: %i(index create update destroy)

  def index
    @tasks = current_user.tasks
  end

  def create
    @task = Task.new(task_params)
    @task.owner_id = current_user.id

    if @task.save
      render "api/projects/show"
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update

  end

  def destroy

  end

  private

  def task_params
    params.require(:task).permit(:name, :assignee_id, :completed,
      :parent_id, :project_id)
  end
end
